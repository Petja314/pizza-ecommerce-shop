'use client';
import React, { useEffect, useState } from 'react';
import { Container, Title } from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Props {
   className?: string;
}

const NotFound: React.FC<Props> = ({ className }) => {
   const pathname = usePathname();
   const searchParams = useSearchParams();
   const [url, setUrl] = useState<string>('');

   useEffect(() => {
      const url = `${pathname}?${searchParams}`;
      setUrl(url);
   }, [pathname, searchParams]);

   return (
      <Container className="mt-[100px]">
         <div className={'flex gap-[70px] justify-center '}>
            <div className={'flex justify-center flex-col gap-4'}>
               <Title
                  text={'Page not found'}
                  size={'xl'}
                  className={'font-bold '}
               />
               <Title
                  className={'text-grey-400'}
                  text={'Please check the page address or try again late'}
                  size={'xs'}
               />
               <div className={'flex gap-5'}>
                  <Link href={'/'}>
                     <Button variant={'default'} size={'lg'}>
                        Home
                     </Button>
                  </Link>

                  <Link href={url}>
                     <Button variant={'outline'} size={'lg'}>
                        Refresh
                     </Button>
                  </Link>
               </div>
            </div>

            <img
               className={'w-[340px] h-[340px] '}
               src={'/assets/images/not-found.png'}
               alt="not found page 404"
            />
         </div>
      </Container>
   );
};

export default NotFound;
