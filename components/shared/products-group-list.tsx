'use client';

import React, { useEffect, useState } from 'react';
import { Title } from '@/components/shared/title';
import { cn } from '@/components/lib/utils';
import { ProductCard } from '@/components/shared/product-card';
import { useIntersection } from 'react-use';

interface Props {
    title: string;
    items: any[];
    listClassName?: string;
    categoryId: number;
    className?: string;
}

const ProductsGroupList: React.FC<Props> = ({
    className,
    title,
    items,
    listClassName,
    categoryId,
}) => {
    const intersectionRef = React.useRef(null);

    const intersection = useIntersection(intersectionRef, {
        // root: null,
        // rootMargin: '0px',
        threshold: 0.4,
    });
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log('Count:', count);
    }, []); // 'count' is missing in dependencies

    useEffect(() => {
        if (intersection?.isIntersecting) {
            console.log(title, categoryId);
        }
    }, []);

    return (
        <div className={className}>
            <Title text={title} size={'lg'} className={'font-extrabold mb-5'} />

            <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
                {items.map((product, index) => (
                    <ProductCard
                        key={index}
                        id={1}
                        name={'Маргарита'}
                        imageUrl={product.imageUrl}
                        price={product.items[0].price}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductsGroupList;
