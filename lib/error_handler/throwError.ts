import {
    CustomError,
    ValidationError,
    NotFoundError,
    DatabaseError,
    InternalServerError,
    ConflictError,
    DataIntegrityError
  } from "@/lib/error_handler/customeErrors";
  
  import { 
    PrismaClientKnownRequestError,
    PrismaClientValidationError,
    PrismaClientInitializationError 
  } from "@prisma/client/runtime/library";
  
  interface ErrorContext {
    requestId?: string;
    userId?: string;
    path?: string;
    operation?: string;
    [key: string]: unknown;
  }
  
  /**
   * Transforms and throws appropriate typed errors
   */
  export function throwAppropriateError(
    error: unknown,
    context: ErrorContext = {}
  ): never {
    // Already a CustomError - just throw it
    if (error instanceof CustomError) {
      throw error;
    }
  
    // Handle Prisma known request errors
    if (error instanceof PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          throw new ConflictError("A record with this value already exists.", {
            field: error.meta?.target,
            ...context
          });
  
        case 'P2025':
        case 'P2001':
          throw new NotFoundError("The requested record was not found.");
  
        case 'P2003':
          throw new DataIntegrityError("Related record not found.", {
            field: error.meta?.field_name,
            ...context
          });
  
        case 'P2014':
          throw new DataIntegrityError("Invalid database operation.", {
            details: error.meta,
            ...context
          });
  
        default:
          throw new DatabaseError(
            "Database operation failed.",
            {
              code: error.code,
              meta: error.meta,
              ...context
            }
          );
      }
    }
  
    // Handle Prisma validation errors
    if (error instanceof PrismaClientValidationError) {
      throw new ValidationError(
        "Invalid data provided for database operation.",
        {
          validationError: error.message,
          ...context
        }
      );
    }
  
    // Handle Prisma initialization errors
    if (error instanceof PrismaClientInitializationError) {
      throw new DatabaseError(
        "Database connection failed.",
        {
          errorCode: error.errorCode,
          clientVersion: error.clientVersion,
          ...context
        }
      );
    }
  
    // Handle standard Error instances
    if (error instanceof Error) {
      throw new InternalServerError(
        error.message || "An unexpected error occurred."
      );
    }
  
    // Handle unknown error types
    throw new InternalServerError("An unknown error occurred.");
  }