/* -----------------------------------------------------------------------------
 * Copyright © 2015, Numenta, Inc. Unless you have purchased from
 * Numenta, Inc. a separate commercial license for this software code, the
 * following terms and conditions apply:
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero Public License for
 * more details.
 *
 * You should have received a copy of the GNU Affero Public License along with
 * this program. If not, see http://www.gnu.org/licenses.
 *
 * http://numenta.org/licenses/
 * -------------------------------------------------------------------------- */


import {ModelService} from '../../../js/main/ModelService2';
const assert = require('assert');

const MODEL_ID = '1';
const EXPECTED_RESULTS = '["2016-01-01 00:00:00", 0, 0.5]\n'; // Log scaled
const PARAM_FINDER_JSON = require('./fixtures/param_finder.json');
const MODEL_RUNNER_INPUT_SPEC = require('./fixtures/model_runner_input_spec.json');

/* eslint-disable max-nested-callbacks */

describe('ModelService2', () => {
  let service = new ModelService();
  let fileOpt = MODEL_RUNNER_INPUT_SPEC;
  let aggregationOpt = PARAM_FINDER_JSON.aggInfo;
  let modelOpt = PARAM_FINDER_JSON.modelInfo;
  beforeEach(() => {
    service.createModel(MODEL_ID, fileOpt, aggregationOpt, modelOpt);
  });
  afterEach(() => {
    try {
      service.removeModel(MODEL_ID);
    } catch (ignore) {
      /* It may be closed by the test itself */
    }
  });

  describe('#getModels()', () => {
    it('Check model exists', (done) => {
      let models = service.getModels();
      assert(models.find((id) => (id) === MODEL_ID), 'Model not found');
      done();
    });
  });

  describe('Model Events', () => {

    it('Read data from model', (done) => {
      service.on(MODEL_ID, (type, data) => {
        assert(type !== 'error', data);
        if (type === 'data') {
          assert.equal(data, EXPECTED_RESULTS);
          service.removeAllListeners(MODEL_ID);
          done();
        }
      });
    });


  });

  describe('Model concurrency', () => {
    it('Create models up to max concurrency', (done) => {
      let max = service.availableSlots();
      // The first model was created in 'beforeEach'
      for (let i=1; i<=max; i++) {
        service.createModel(MODEL_ID+i, fileOpt, aggregationOpt, modelOpt);
      }
      // Cleanup
      for (let i=1; i<=max; i++) {
        service.removeModel(MODEL_ID+i);
      }
      done();
    });
    it ('Create models past max concurrency', (done) => {
      let max = service.availableSlots();
      // The first model was created in 'beforeEach'
      for (let i=1; i<=max; i++) {
        service.createModel(MODEL_ID+i, fileOpt, aggregationOpt, modelOpt);
      }
      // Extra model
      assert.throws(() => {
        service.createModel('extra', fileOpt, aggregationOpt, modelOpt);
      }, /Too many models/);
      // Cleanup
      for (let i=1; i<=max; i++) {
        service.removeModel(MODEL_ID+i);
      }
      done();
    });
  });
});
