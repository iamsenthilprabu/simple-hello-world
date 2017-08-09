'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'simple-hello-world:insert': () => this.insert()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  insert() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      editor.insertText('Hello World');
    }
  }

};
