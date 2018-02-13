import * as React from 'react';

// redux-form
import { reduxForm, Field, FormErrors, InjectedFormProps, FormSubmitHandler } from 'redux-form';
import { WrappedFieldProps, GenericField } from 'redux-form';

// material-ui
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const styles: ReadonlyMap<string, React.CSSProperties> = new Map<string, React.CSSProperties>([
  ['container', {
    display: 'flex',
    flexWrap: 'wrap',
  }],
  ['textField', {
    marginLeft: 8,
    marginRight: 8,
    width: 200,
  }],
  ['submit', {
    marginLeft: 8
  }]
]);

interface FormData {
  name?: string;
  lastname?: string;
}

const validate = (values: Readonly<FormData>): FormErrors<FormData> => { 
  const errors: FormErrors<FormData> = {};

  if (values.name === undefined) {
    errors.name = 'name needed';
  }

  if (values.lastname === undefined) {
    errors.lastname = 'lastname needed';
  }

  return errors;
};

// -----------------------------------------

interface MyFieldCustomProps {
  placeholder: string;
}

const FieldCustom = Field as new () => GenericField<MyFieldCustomProps>;

type FieldCustomProps = MyFieldCustomProps & WrappedFieldProps;

// -----------------------------------------

type Props = {} & InjectedFormProps<FormData>;

class Form extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
  }

  public handleSubmitCallback: FormSubmitHandler<FormData, {}> = (values: Partial<FormData>): void => {
    window.console.log(values);
  }

  public renderInputField(field: FieldCustomProps): JSX.Element {
    return(
      <div>
        <TextField
          style={styles.get('textField')}
          label={field.placeholder}
          placeholder={field.placeholder}
          margin="normal"
        />
      </div>
    );
  }

  public render(): JSX.Element {
    return (
      <form style={styles.get('container')} onSubmit={this.props.handleSubmit(this.handleSubmitCallback)}>
        <FieldCustom name="firstName" component={this.renderInputField} placeholder="First Name" />
        <FieldCustom name="lastName" component={this.renderInputField} placeholder="Last Name" />
        <Button style={styles.get('submit')} variant="raised" size="medium" color="primary">
          Submit
        </Button>
      </form>
    );
  }
}

export default reduxForm<Readonly<FormData>, {}>({
  form: 'SelectionWithForm',
  validate: validate
})(Form);
