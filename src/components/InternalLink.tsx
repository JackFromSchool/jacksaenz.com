import { useState, useEffect } from 'react';
import { useFloating, useHover, useInteractions } from '@floating-ui/react';
import {flip} from '@floating-ui/dom';
import { getEntry } from 'astro:content';

import '../styles/internal-link.scss';

interface ExternalLinkProps {
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

export default function ExternalLink(props: ExternalLinkProps) {
   
   const [ isOpen, setIsOpen ] = useState(false);
   const [ entryData, setEntryData ] = useState<EntryData>();

   const { refs, floatingStyles, context } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement: 'top',
      middleware: [ flip() ],
   });

   const hover = useHover(context);

   useEffect(() => {
      if (props.type === 'essay') {
         getEntry('essay', props.link).then(result => {
            setEntryData(new EntryData(result?.data.title!, result?.data.brief!));
         })
      } else if (props.type === 'thought') {
         getEntry('thought', props.link).then(result => {
            setEntryData(new EntryData(result?.data.title!, result?.data.brief!));
         })
      } else if (props.type === 'media') {
         getEntry('media', props.link).then(result => {
            setEntryData(new EntryData(result?.data.name!, result?.data.brief!));
         })
      } else if (props.type === 'none') {
         setEntryData(new EntryData("Not Yet Made", "This article doesn't exist yet, but it might soon! I just linked to it becuase I intend to write about it eventually."))
      }
   });

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
                  {entryData?.title}
               </h1>
               <p>
                  {entryData?.brief}
               </p>
            </div>
         )}
      </>
   );
}
