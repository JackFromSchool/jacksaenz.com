import { useState } from 'react';
import { useFloating, useHover, useInteractions } from '@floating-ui/react';

import '../styles/hovers.scss';

interface ExternalLinkProps {
   link: string;
   children: React.ReactNode;
};

export default function ExternalLink(props: ExternalLinkProps) {
   
   const [ isOpen, setIsOpen ] = useState(false);

   const { refs, floatingStyles, context } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: 'top'
   });

   const hover = useHover(context);

   const { getReferenceProps, getFloatingProps } = useInteractions([
      hover,
   ]);
   
   return (
      <>
         <a 
            className="link-colors"
            href={props.link} 
            ref={refs.setReference} 
            {...getReferenceProps()}
         >{props.children}</a>
         {isOpen && (
            <div
               className="floating-div"
               ref={refs.setFloating} 
               style={floatingStyles} 
               {...getFloatingProps()}
            >
               <p>
                  {props.link}
               </p>
            </div>
         )}
      </>
   );
}
