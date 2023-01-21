export enum ServerErrorTypes {
  "AUTH" = "auth",
  "INPUT" = "input",
}

export class ServerError extends Error {
  readonly type?: ServerErrorTypes;
  readonly statusCode: number;
  readonly originalMessage: string;
  readonly name = "ServerError";

  constructor(originalMessage: string, type?: ServerErrorTypes) {
    super();
    this.originalMessage = originalMessage;
    this.type = type;
    if (this.type === ServerErrorTypes.AUTH) {
      this.statusCode = 401;
      this.message = "Unauthorized - " + this.originalMessage;
    } else if (this.type === ServerErrorTypes.INPUT) {
      this.statusCode = 400;
      this.message = "Invalid input - " + this.originalMessage;
    } else {
      this.statusCode = 500;
      this.message = "Internal server error - " + this.originalMessage;
    }
  }
}
