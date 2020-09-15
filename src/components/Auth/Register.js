import React from "react";
import firebase from "../../firebase";
import { 
  Grid, 
  Form, 
  Segment, 
  Button, 
  Header, 
  Message, 
  Icon 
} from "semantic-ui-react";
import { Link } from "react-router-dom";

class Register extends React.Component {
    state={
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        errors: [],
        loading: false 
    };

    isFormValid = () => {
        let errors = [];
        let error;

        if (this.isFormEmpty(this.state)) {
          error = { message: "Fill in all fields" };
          this.setState({ errors: errors.concat(error) });
          return false;
        } else if (!this.isPasswordValid(this.state)) {
          error = { message: "Password is not Valid" };
          this.setState({ errors: errors.concat(error) });
          return false;
        } else {
          return true;
          }
    };

    isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
        return ( 
            !username.length ||
            !email.length || 
            !password.length || 
            !passwordConfirmation.length
        );
    };

    isPasswordValid = ({ password, passwordConfirmation }) => {
        if (password.length < 6 || passwordConfirmation.length <6) {
            return false;
        } else if (password !== passwordConfirmation) {
            return false;
        } else {
            return true;
        }
    };

    displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>)
    
    handleChnage= event => {
       this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        if (this.isFormValid()) {
            this.setState({ error: [], loading: true });
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
            console.log(createdUser);
            this.setState({ loading: false });
        })
        .catch(err => {
            console.log(err)
            this.setState({ errors: this.state.errors.concat(err), loading: false});
        });
      }
        
    };

    handleInputError = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes("inputName")
        ) 
        ? "error" 
        : ""
    }


    render() {
        const { 
            username, 
            email, 
            password, 
            passwordConfirmation,
            errors,
            loading
        } = this.state;
        
        return (
           <Grid textAlign="center" verticalAlign="middle" className="app">
               <Grid.Column style={{ maxWidth: 450 }}>
                   <Header as= "h2" icon color="red" textAlign="center">
                   <Icon name="puzzle piece" color="red" />
                    Register for BloodHaze
                   </Header>
                   <Form onSubmit={this.handleSubmit} size="large">
                      <Segment stacked>
                          <Form.Input 
                          fluid 
                          name="username" 
                          icon="user" 
                          iconPosition="left"
                          placeholder="Username" 
                          onChange={this.handleChnage} 
                          value={username}
                          type="text"
                          />

                          <Form.Input 
                          fluid 
                          name="email" 
                          icon="mail" 
                          iconPosition="left"
                          placeholder="Email Address" 
                          onChange={this.handleChnage} 
                          value={email}
                          className={this.handleInputError(errors, "email")}
                          type="email" 
                          />

                          <Form.Input 
                          fluid 
                          name="password" 
                          icon="lock" 
                          iconPosition="left"
                          placeholder="Password" 
                          onChange={this.handleChnage} 
                          value={password}
                          className={this.handleInputError(errors, "password")}
                          type="password"
                          />

                          <Form.Input 
                          fluid 
                          name="passwordConfirmation" 
                          icon="repeat" 
                          iconPosition="left"
                          placeholder="Password Confirmation" 
                          onChange={this.handleChnage} 
                          value={passwordConfirmation}
                          className={this.handleInputError(errors, "password")}
                          type="password"
                           /> 

                          <Button disabled={loading} className={loading ? 'loading' : ''} color="red" fluid size="large">
                          Submit
                          </Button>
                      </Segment> 
                   </Form>
                   {this.state.errors.length > 0 && (
                      <message error>
                        <h3>Error</h3>
                          {this.displayErrors(errors)};
                      </message> 
                   )}
                   <Message>Already a user?  <Link to="/login">Login</Link>
                   </Message>
                </Grid.Column>
           </Grid>
        );
    }
}

export default Register;