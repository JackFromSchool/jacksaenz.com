import { useState, useEffect } from 'react';
import { useFloating, useHover, useInteractions } from '@floating-ui/react';
import { flip } from '@floating-ui/dom';

import '../styles/internal-link.scss';

interface InternalLinkProps {
   link: string;
   type: 'essay' | 'thought' | 'media' | 'none';
   children: React.ReactNode;
};

class EntryData {
   title: string;
   brief: string;

   constructor(title: string, brief: string) {
      this.title = title;
      this.brief = brief;
   }
}

export default function ExternalLink(props: InternalLinkProps) {
   
   const [ isOpen, setIsOpen ] = useState(false);
   const [ entryData, setEntryData ] = useState<EntryData>();

   const { refs, floatingStyles, context } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: 'top',
      middleware: [ flip() ],
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
               className="floating-div-internal"
               ref={refs.setFloating} 
               style={floatingStyles} 
               {...getFloatingProps()}
            >
               <h1>
                  I'll fix this later
               </h1>
               <p>
               </p>
            </div>
         )}
      </>
   );
}
