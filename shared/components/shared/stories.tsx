'use client';
import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Container } from '@/shared/components/shared/container';
import { Api } from '@/services/api-client';
import { IStory } from '@/services/stories';
import { X } from 'lucide-react';
import ReactStories from 'react-insta-stories';

interface Props {
   className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
   const [stories, setStories] = React.useState<IStory[]>([]);
   const [open, setOpen] = React.useState(false);
   const [selectedStory, setSelectedStory] = React.useState<IStory>();

   React.useEffect(() => {
      async function fetchStories() {
         const data = await Api.stories.getAll();
         setStories(data);
      }

      fetchStories();
   }, []);

   const onClickStory = (story: IStory) => {
      setSelectedStory(story);

      if (story.items.length > 0) {
         setOpen(true);
      }
   };

   const isSmallScreen = window.innerWidth <= 768;

   const shownSkeleton = (value: number) => {
      return [...Array(value)].map((_, index) => (
         <div
            key={index}
            className=" w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse max-sm:w-[140px] max-sm:h-[190px] "
         />
      ));
   };

   return (
      <Container className={'pl-5 pr-5'}>
         <div
            className={
               'flex items-center justify-between my-10  overscroll-x-auto overflow-hidden '
            }
         >
            {stories.length === 0 && isSmallScreen
               ? shownSkeleton(3)
               : shownSkeleton(6)}

            {stories.map((story) => (
               <img
                  key={story.id}
                  onClick={() => onClickStory(story)}
                  className="pr-2 w-[200px] h-[250px] rounded-md cursor-pointer max-sm:w-[140px] max-sm:h-[190px]"
                  src={story.previewImageUrl}
               />
            ))}
         </div>

         {open && (
            <div className="absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30">
               <div className="relative" style={{ width: 520 }}>
                  <button
                     className="absolute -right-10 -top-5 z-30"
                     onClick={() => setOpen(false)}
                  >
                     <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
                  </button>

                  <ReactStories
                     onAllStoriesEnd={() => setOpen(false)}
                     stories={
                        selectedStory?.items.map((item) => ({
                           url: item.sourceUrl,
                        })) || []
                     }
                     defaultInterval={3000}
                     width={520}
                     height={800}
                  />
               </div>
            </div>
         )}
      </Container>
   );
};
