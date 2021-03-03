export const SuccessfulOperationToast = (toast, message) =>
  toast({
    title: 'Success!',
    description: message,
    status: 'success',
    isClosable: true,
  });

export const FailedOperationToast = (toast, apiResponse = {}) =>
  toast({
    title: 'Failed!',
    description: apiResponse.message || 'Error occurred. Please try again later!',
    status: 'error',
    isClosable: true,
  });
