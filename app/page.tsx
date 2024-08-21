import {
    Container,
    Filters,
    ProductCard,
    Title,
    TopBar,
} from '@/components/shared';
import ProductsGroupList from '@/components/shared/products-group-list';

const product = [
    {
        id: 1,
        name: 'Маргарита',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
        price: 24,
        items: [{ price: 24 }],
    },

    {
        id: 1,
        name: 'Маргарита',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
        price: 24,
        items: [{ price: 24 }],
    },

    {
        id: 1,
        name: 'Маргарита',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
        price: 24,
        items: [{ price: 24 }],
    },

    {
        id: 1,
        name: 'Маргарита',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
        price: 24,
        items: [{ price: 24 }],
    },
    {
        id: 1,
        name: 'Маргарита',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
        price: 24,
        items: [{ price: 24 }],
    },
    {
        id: 1,
        name: 'Маргарита',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
        price: 24,
        items: [{ price: 24 }],
    },
    {
        id: 1,
        name: 'Маргарита',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
        price: 24,
        items: [{ price: 24 }],
    },
    {
        id: 1,
        name: 'Маргарита',
        imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7D611ADF5AAD898B8B651186E023.avif',
        price: 24,
        items: [{ price: 24 }],
    },
];

export default function Home() {
    return (
        <div>
            <Container className={'mt-10'}>
                <Title
                    text={'Все пиццы'}
                    size={'lg'}
                    className={'font-extrabold'}
                ></Title>
            </Container>

            <TopBar />

            <Container className={'pb-14 mt-10'}>
                <div className={'flex gap-[80px]'}>
                    {/*FILTRATION SIDE*/}
                    <div className={'w-[250px]'}>
                        <Filters />
                    </div>

                    {/*LIST OF PRODUCTS*/}
                    <div className={'flex-1'}>
                        <div className={'flex flex-col gap-16'}>
                            <ProductsGroupList
                                title={'Пиццы'}
                                items={product}
                                categoryId={1}
                            />
                        </div>
                    </div>
                </div>
            </Container>

            {/*<div style={{height : "3000px"}}></div>*/}
        </div>
    );
}
