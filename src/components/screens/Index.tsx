import { Dialog } from '@headlessui/react';
import { useRef, useState } from 'react';
import { useAuthState } from '~/components/contexts/UserContext';
import { SignInButton } from '~/components/domain/auth/SignInButton';
import { SignOutButton } from '~/components/domain/auth/SignOutButton';
import { Head } from '~/components/shared/Head';
import BouncingSVGElements from '~/components/lib/BouncingSVGElements';

function Index() {
  const { state } = useAuthState();
  const [isOpen, setIsOpen] = useState(true);
  const completeButtonRef = useRef(null);

  return (
    <>
      <Head title="TOP PAGE" />
      <div className="min-h-screen max-w-screen">
        <div className="text-center items-center">
          <div className="p-8">
            <h1 className="text-9xl rock-3d-logo">
              JegPuster<b>Ikke</b>
            </h1>
            <div className="flex justify-center items-center p-8">
              <div className="">
                <BouncingSVGElements containerId={'Hue'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
