type Props = {
    condition: boolean,
    children: React.ReactNode,
}

export default ({children,condition} : Props) => {
    if(condition) {
        return <>
            {children} 
        </>
    }else{
        return <></>
    }
}