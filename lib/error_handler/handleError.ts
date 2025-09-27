import { NextResponse } from "next/server";

import { CustomError } from "@/lib/error_handler/customeErrors";


interface ErrorResponse {
  message: string;
  errorCode?: string;
  details?: Record<string, unknown>;
}

interface ErrorContext {
  requestId?: string;
  userId?: string;
  path?: string;
  [key: string]: unknown;
}

/**
 * Handles errors and returns appropriate NextResponse
 */
export function handleError(
  error: unknown,
  context: ErrorContext = {}
): NextResponse<ErrorResponse> {
  

  // Handle CustomError instances (including all derived classes)
  if (error instanceof CustomError) {
  
    

    return NextResponse.json(
      {
        message: error.message,
        errorCode: error.errorCode,
        details:  error.details 
      },
      {
        status: error.statusCode,
        headers: {
          'Cache-Control': 'no-store',
        }
      }
    );
  }

  // Log unexpected errors


  // Return generic error response for unexpected errors
  return NextResponse.json(
    {
      message: "An unexpected error occurred. Please try again later.",
      errorCode: "INTERNAL_SERVER_ERROR",
      details:  {
        error: error instanceof Error ? error.message : String(error)
      } 
    },
    {
      status: 500,
      headers: {
        'Cache-Control': 'no-store'
      }
    }
  );
}