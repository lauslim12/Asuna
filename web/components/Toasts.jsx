export const SuccessfulOperationToast = (toast, message) =>
  toast({
    title: 'Success!',
    description: message,
    status: 'success',
    isClosable: true,
  });

export const FailedOperationToast = (toast, message = null) =>
  toast({
    title: 'Failed!',
    description: message || 'Error occurred. Please try again later!',
    status: 'error',
    isClosable: true,
  });
