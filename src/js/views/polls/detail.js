'use strict';

import {myAlert} from '../../app/helpers';
import {getPollFields, setPollFields}  from '../../app/sync';
import Form             from './poll-form';
import Result           from './poll-result';

function setTitle(model) {
  let $ = Backbone.$;
  $('.poll-title').text(model.get('name'));
}


class Page extends Backbone.View {
  initialize() {
    this.$empty = this.$el.find('.empty-page');
    this.$content = this.$el.find('.content-block-inner');
    this.$el.find('.toolbar-poll').addClass('is-active');

    // событие всплывает когда нажали на кнопку отправить в форме
    this.listenTo(this.model, 'vote:submit', this.submitFrom);
    // стандартное событие изменения модели
    this.listenTo(this.model, 'change:voted', this.render);
  }

  render() {
    setTitle(this.model);

    this.$empty.hide();
    let voted = this.model.get('voted');

    getPollFields(this.model)
      .then(questions => this[ voted ? '_renderResult' : '_renderForm' ](questions))
      .catch(() => this.$empty.show())
      .then(() => {
        // TODO hide ajax loader
      });

    return this;
  }

  _renderResult(questions) {
    if (!questions) {
      this.$empty.show();
      return this;
    }

    let result = new Result({
      collection: questions,
      el: this.$content
    });
    result.render();
  }

  _renderForm(questions) {
    if (!questions) {
      this.$empty.show();
      return this;
    }

    let form = new Form({
      collection: questions,
      model: this.model,
      el: this.$content
    });
    form.render();
  }

  submitFrom(params) {
    if (!params) {
      myAlert('Выберите хотя бы одни вариант ответа!');
      return this;
    }
    let emptyText = this.$empty.attr('data-text');

    this.$content.empty();
    this.$empty
      .attr('data-text', 'Загрузка результатов голосования...')
      .show();

    setPollFields(this.model, params)
      .then(() => {
        this.model.set({voted: true}).save();
        this.$empty.hide();
      })
      .catch(e => myAlert(e.message))
      .then(() => this.$empty.attr('data-text', emptyText));
  }
}

export default Page;
