import type { ErrorRequestHandler, NextFunction, Request, Response } from "express"

export function mwErrorLogger(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log("\nmwErrorLogger:\n")

  console.error(err)

  console.log("\n")

  next(err)
}

/**This middleware is always executed last */
export function mwErrorHandler(err: any, req: Request, res: Response): void {
  console.log("\nmwErrorHandler\n")
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  })
}

/**This middleware is always executed first */
export function mwBoomErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log("\nmwBoomErrorHandler\n")
  if (err.isBoom) {
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  } else {
    next(err)
  }
}
