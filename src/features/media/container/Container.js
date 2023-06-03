import { selectMediaUrls } from './containerSlice';
import { useSelector } from 'react-redux';
import Card from '../../../components/Card';


export default function Container() {
    const mediaUrls = useSelector(selectMediaUrls); 

    return (
        <>
        {mediaUrls.map((url) => (
            <Card url={url} />
        ))}
        </>
    )
}

