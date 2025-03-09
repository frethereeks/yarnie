export const fileUpload = async (file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    const data = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result)
        reader.onerror = err => reject(err)
    })
    return data;
}