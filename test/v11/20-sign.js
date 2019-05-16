const config = require('../../config.json');
const util = require('./util');
const {expect} = require('chai');
const {registry} = require('./input/algorithms');

// base64 string should only consist of letters,
// numbers, and end with an = sign.
const base64String = /[A-Za-z0-9+/=]=$/;

describe.skip('Sign', function() {
  let generatorOptions = null;
  before(function() {
    generatorOptions = {
      generator: config.generator,
      command: 'sign',
      args: {},
      date: new Date().toGMTString(),
    };
  });

  it('MUST REQUIRE keyId.', async function() {

  });

  it(`A client MUST generate a signature by base 64 encoding
      the output of the digital signature algorithm.`, async function() {
    // The `signature` is then generated by base 64
    // encoding the output of the digital signature algorithm.
    const result = await util.generate(
      'basic-request', generatorOptions);
    expect(result, 'Expected sign to return a Signature').to.exist;
    result.should.match(base64String);
  });
  it(`A client MUST use the headers and algorithm values as
      well as the contents of the HTTP message,
      to create the signature string.`, async function() {
    const result = await util.generate(
      'basic-request', generatorOptions);
    expect(result, 'Expected sign to return a Signature').to.exist;
    result.should.match(base64String);
  });
  it(`A client MUST use the key associated with keyId to 
      generate a digital signature on the
      signature string.`, async function() {
    // Use the key associated with `keyId`
    // to generate a digital signature on the signature string.
    const result = await util.generate(
      'basic-request', generatorOptions);
    expect(result, 'Expected sign to return a Signature').to.exist;
    result.should.match(base64String);
  });

  describe('Algorithm Parameter', function() {

    it(`MUST produce an error if algorithm
        parameter differs from key metadata.`, async function() {
      /**
       * If `algorithm` is provided and differs from
       * the key metadata identified by the `keyId`,
       * for example `rsa-sha256` but an EdDSA key
       * is identified via `keyId`,
       * then an implementation MUST produce an error.
      */
    });

    it(`Signature scheme MUST be in the
        HTTP Signatures Algorithms Registry.`, async function() {

    });
    describe('signature scheme', function() {
      registry.forEach(({scheme, deprecated}) => {
        if(deprecated) {
          it(`MUST reject deprecated algorithm ${scheme}.`, async function() {

          });
        } else {
          it(`MUST sign for algorithm ${scheme}.`, async function() {

          });
        }
      });
    });
  });

  it.skip(`MUST be able to discover metadata
      about the key from the keyId.`, async function() {
    /**
      * Implementations MUST be able to discover metadata
      * about the key from the `keyId` such that they can
      * determine the type of digital signature algorithm
      * to employ when creating or verifying signatures.
    */
    let error = null;
    try {
      await util.generate(
        'nokeymetadata-request', generatorOptions);
    } catch(e) {
      error = e;
    }
    error.should.not.be.null;
  });

  it.skip(`MUST NOT process a signature with a
      created timestamp value that is in the future.`, async function() {
    /**
     * A signature with a `created` timestamp value
     * that is in the future MUST NOT be processed.
    */
    let error = null;
    try {
      await util.generate('created-in-future', generatorOptions);
    } catch(e) {
      error = e;
    }
    error.should.not.be.null;
  });

  it.skip(`MUST NOT process a signature with an expires
      timestamp value that is in the past.`, async function() {
    /**
      * A signatures with a `expires` timestamp
      * value that is in the past MUST NOT be processed.
    */
    let error = null;
    try {
      await util.generate('expired', generatorOptions);
    } catch(e) {
      error = e;
    }
    error.should.not.be.null;
  });
});
