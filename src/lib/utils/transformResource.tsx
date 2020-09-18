import React, {Children} from 'react';

// Pass down prop record = transformRecord(record)
export default function Transform(props: any) {
  const forkedProps = {...props};
  const record = props.transformRecord(forkedProps.record)
  return React.cloneElement(Children.only(props.children), {record})
}