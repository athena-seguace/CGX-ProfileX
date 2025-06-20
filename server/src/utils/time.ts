const timeOut = async (seconds: number) => {
    return await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}


export { timeOut };
