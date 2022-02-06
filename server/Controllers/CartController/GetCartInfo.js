

const Cart = require('../../Schemas/Cart')
const objectid = require('mongodb').ObjectId

const getCartProduct= UserID => {
    return new Promise((resolve, reject) => {
        Cart.aggregate([
            {
                $match: { userID: objectid(UserID) }
            },
            {
                $unwind: "$products"
            },
            {
                $project: {
                    productsId: "$products.productID",
                    quantity: "$products.quantity"
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: "productsId",
                    foreignField: "_id",
                    as: "products"
                }
            },
            {
                $unwind: "$products"

            },
            {
                $project: {
                    _id: "$products._id",
                    name: "$products.name",
                    price: "$products.price",
                    quantity: "$quantity",
                    imageId: "$products.imageId",
                    stock: {
                        $cond: {
                            if: {
                                $gte: ["$products.quantity", "$quantity"]
                            },
                            then: true,
                            else: false
                        }
                    },
                    total: { $multiply: ["$products.price", "$quantity"] },
                    available: "$products.available",
                },
            }
        ]).then(cart => {
            if (cart.length <= 0) {
                return reject(  "Cart is empty" )
            } else {
                resolve(cart )
            }
        }).catch(err => {
            reject("Oops! Something went wrong" )
        })

    })
}
const CartProductTolal = UserID => {
    return new Promise((resolve, reject) => {
        Cart.aggregate([
            {
                $match: { userID: objectid(UserID) }},
            {
                $unwind: "$products"
            },
            {
                $project: {
                    productsId: "$products.productID",
                    quantity: "$products.quantity"
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: "productsId",
                    foreignField: "_id",
                    as: "products"
                }
            },
            {
                $unwind: "$products"
            },
            {
                $group: {
                    _id: null,
                    totalPrice: { $sum: { $multiply: ["$products.price", "$quantity"] } }
                }
                
            },
            {
                $project: {
                    _id: 0,
                    totalPrice: "$totalPrice"

                }
            }
        ]).then(result => {resolve(result[0].totalPrice);}
        ).catch(err => {reject({status: false, message: "Cart is empty"})});
    })
}


const getCartProductsInfo = async (req, res) => {
    let UsersID = req.user.id;
    Promise.all([getCartProduct(UsersID), CartProductTolal(UsersID)]).then(result => {
        res.json({status: true,cart: result[0],totalamout: result[1],});}
    ).catch(err => {
        res.json({status: false,message: err.message});});
};

module.exports = {
    getCartProductsInfo ,
    getCartProduct,
    CartProductTolal,
}