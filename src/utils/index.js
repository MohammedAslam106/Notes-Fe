export default async function request(endPoint,{method='GET',body={},headers={}},stringify=true){
    const response=await (fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${endPoint}`,{
        method:method,
        body:method=='GET'?null:stringify?JSON.stringify(body):body,
        headers:{
            Authorization:`Bearer ${JSON.parse((localStorage.getItem('noteUser')))?.token}`,
            'Content-Type':stringify?'application/json':undefined,
            ...headers
        }
    }))
    const status=response.status
    if(status==200){
        const data=await response.json()
        return data
    }
}