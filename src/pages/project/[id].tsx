import {useRouter} from 'next/router'
 
export default function Project() {
    const router = useRouter();
    const {id} = router.query;
 
    return (
        <div className="container">
            <h1> You are now reading project {id} </h1> 
        </div>
    )
    
}
 