import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request, res: Response) {
  try {
    const body: { toEmail: string } = await req.json();

    console.log(body);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PW,
      },
    });

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: body.toEmail,
      subject: "Studiopresto",
      text: "Замовлення оформленно",
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "The email good" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" });
  }
}
