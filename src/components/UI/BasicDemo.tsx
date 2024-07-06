import { useState, useEffect } from 'react';
import { Galleria, GalleriaResponsiveOptions } from 'primereact/galleria';
import PhotoService, { Photo } from '../../service/PhotoService';

export default function BasicDemo() {
    const [images, setImages] = useState<Photo[]>();
    const responsiveOptions: GalleriaResponsiveOptions[] = [
        {
            breakpoint: '991px',
            numVisible: 4
        },
        {
            breakpoint: '767px',
            numVisible: 3
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];

    useEffect(() => {
        const photoService = new PhotoService();
        const imagesData = photoService.getImages();
        setImages(imagesData);
    }, []);

    const itemTemplate = (item:any) => {
        return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
    }

    const thumbnailTemplate = (item:any) => {
        return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;
    }


    return (
        <div className="border border-sky-800 shadow-xl shadow-blue-800">
            <Galleria
                value={images} 
                style={{ maxWidth: '1280px'} } 
                numVisible={5}
                showItemNavigators 
                showThumbnails={false} item={itemTemplate} thumbnail={thumbnailTemplate} 
                circular 
                autoPlay 
                transitionInterval={2000}
            />
        </div>
    )
}
