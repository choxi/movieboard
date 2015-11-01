import {PropTypes, Component} from 'react';

export default function fetch(action) {
  return (Wrapped) => {
    class Fetch extends Component {
      // This enables client side fetching, method is called only in browser.
      componentDidMount() {
        // Dispatch is injected by react-redux.
        // React router injects location and params for every routed component.
        const {dispatch, location, params} = this.props;
        dispatch(action({location, params}));
      }

      render() {
        return <Wrapped {...this.props} />;
      }
    }

    // This enables server side fetching.
    // Check src/server/frontend/render.js fetchComponentData function.
    Fetch.fetchAction = action;

    Fetch.propTypes = {
      dispatch: PropTypes.func,
      location: PropTypes.object,
      params: PropTypes.object
    }
  };
}
