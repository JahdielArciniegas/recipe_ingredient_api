const createErrorFactory = (name: string) => {
  return class BusinessError extends Error {
    constructor(message: string) {
      super(message);
      this.name = name;
    }
  };
};

export const BadRequestError = createErrorFactory("BadRequestError");
export const NotFoundError = createErrorFactory("NotFoundError");
export const UnauthorizedError = createErrorFactory("UnauthorizedError");
export const ForbiddenError = createErrorFactory("ForbiddenError");
export const InternalServerError = createErrorFactory("InternalServerError");
