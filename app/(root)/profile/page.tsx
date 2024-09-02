import { redirect } from 'next/navigation';
import { getUserSession } from '@/shared/lib/get-user-session';
import { prisma } from '@/prisma/prisma-client';
import { ProfileForm } from '@/shared/components/shared/profile';

export default async function ProfilePage() {
   const session = await getUserSession();
   if (!session) {
      return redirect('/not-auth');
      // return <UnauthorizedPage />;
   }
   const user = await prisma.user.findFirst({
      where: {
         id: Number(session?.id),
      },
   });
   if (!user) {
      return redirect('/not-auth');
      // return <UnauthorizedPage />;
   }
   return <ProfileForm data={user} />;
}
