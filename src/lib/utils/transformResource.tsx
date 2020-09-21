import React, {Children} from 'react';

// Pass down prop record = transformRecord(record)
export default function Transform(props: any) {
  const forkedProps = {...props};
  forkedProps.record = props.transformRecord(forkedProps.record)

  // remove unwanted props
  delete forkedProps.children
  delete  forkedProps.transformRecord;

  // clone the child element, merge received props
  return React.cloneElement(Children.only(props.children), forkedProps)
}