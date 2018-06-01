import React from 'react';
import WrapAndCenter from './../containers/WrapAndCenter'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const PageTransitionWrap = WrappedComponent => {
  return props => (   
    <TransitionGroup>
      <WrapAndCenter>
        <CSSTransition
          // transitionName={props.match.path === '/login' ? 'SlideIn' : 'SlideOut'}
        >
          <WrappedComponent {...props} />
        </CSSTransition>
      </WrapAndCenter>
    </TransitionGroup>
    
  )
}

export default PageTransitionWrap;