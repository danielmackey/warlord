'use babel';

import WarlordView from './warlord-view';
import { CompositeDisposable } from 'atom';

export default {

  warlordView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.warlordView = new WarlordView(state.warlordViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.warlordView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'warlord:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.warlordView.destroy();
  },

  serialize() {
    return {
      warlordViewState: this.warlordView.serialize()
    };
  },

  toggle() {
    console.log('Warlord was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
