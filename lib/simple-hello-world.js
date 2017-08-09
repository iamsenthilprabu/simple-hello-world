'use babel';

import SimpleHelloWorldView from './simple-hello-world-view';
import { CompositeDisposable } from 'atom';

export default {

  simpleHelloWorldView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.simpleHelloWorldView = new SimpleHelloWorldView(state.simpleHelloWorldViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.simpleHelloWorldView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'simple-hello-world:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.simpleHelloWorldView.destroy();
  },

  serialize() {
    return {
      simpleHelloWorldViewState: this.simpleHelloWorldView.serialize()
    };
  },

  toggle() {
    console.log('SimpleHelloWorld was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
