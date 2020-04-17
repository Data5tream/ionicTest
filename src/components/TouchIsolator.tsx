import React, { ReactElement } from 'react';

class TouchIsolator extends React.Component {
  private container: React.RefObject<HTMLDivElement> = React.createRef();

  public componentDidMount(): void {
    const containerNode: any = this.container.current;

    if (!containerNode) {
      return;
    }

    containerNode.addEventListener('touchstart', this.isolateTouch, { passive: true });
    containerNode.addEventListener('touchmove', this.isolateTouch, { passive: true });
    containerNode.addEventListener('touchend', this.isolateTouch, { passive: true });
  }

  public componentWillUnmount(): void {
    const containerNode: any = this.container.current;

    if (!containerNode) {
      return;
    }

    containerNode.removeEventListener('touchstart', this.isolateTouch, { passive: true });
    containerNode.removeEventListener('touchmove', this.isolateTouch, { passive: true });
    containerNode.removeEventListener('touchend', this.isolateTouch, { passive: true });
  }

  public render(): ReactElement {
    return (
      <div ref={this.container}>
        {this.props.children}
      </div>
    );
  }

  private isolateTouch(e: React.TouchEvent): void {
    e.stopPropagation();
  }
}

export default TouchIsolator;
