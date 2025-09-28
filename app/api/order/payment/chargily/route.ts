import { NextResponse } from "next/server";
import { handleError } from "@/lib/error_handler/handleError";
import { createChargilyCheckoutSession } from "./controller";

export async function POST() {
	try {
		const checkoutUrl = await createChargilyCheckoutSession();
		return NextResponse.json({ checkoutUrl }, { status: 201 });
	} catch (error) {
		return handleError(error);
	}
}
