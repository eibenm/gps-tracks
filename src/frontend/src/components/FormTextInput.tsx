// import * as React from 'react';
// import { WrappedFieldProps, Field } from 'redux-form';

// interface MyFieldCustomProps {
//   foo: string;
// }

// type MyFieldProps = MyFieldCustomProps & WrappedFieldProps & Field;

// const MyField: React.StatelessComponent<MyFieldProps> = (props) => {
//   return(
//     <input type="text"/>
//   );
// };

// export default MyField;

import * as React from 'react';
import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { BaseFieldProps } from 'redux-form';

declare type Props = {
  label: string;
};

declare type GenericFieldHTMLAttributes = InputHTMLAttributes<HTMLInputElement> &
  SelectHTMLAttributes<HTMLSelectElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

declare type AllProps = Props & GenericFieldHTMLAttributes & BaseFieldProps;

export default ({ label, children, ...rest }: AllProps) => (
  <input type="text" placeholder={label} />
);
