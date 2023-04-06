import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import dbOrder from "../dbSchemas/order";
import dbUser from "../dbSchemas/user";
const { RAZORPAY_WEBHOOK_SECRET, RAZORPAY_SIGNATURE_HEADER } = process.env;

const verify = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shasum = crypto.createHmac("sha256", RAZORPAY_WEBHOOK_SECRET!);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");
    if (digest === req.headers[RAZORPAY_SIGNATURE_HEADER!]) {
      const { order_id } = req.body.payload.payment.entity;
      const paymentUpdated = await updatePayment(order_id);
      if (paymentUpdated) {
        await updateUser(paymentUpdated);
      }

      return res.json({ status: "ok" });
    }
    res.json({ status: "error" });
  } catch (error) {
    next(error);
  }
};

const updatePayment = (orderId: string) => {
  return dbOrder.findOneAndUpdate(
    { paymentId: orderId },
    {
      $set: {
        paymentStatus: "paid",
      },
    }
  );
};

const updateUser = (paymentUpdated: any) => {
  return dbUser.updateOne(
    { _id: paymentUpdated.userId },
    {
      $push: {
        orders: paymentUpdated._id,
      },
    }
  );
};

export default verify;
