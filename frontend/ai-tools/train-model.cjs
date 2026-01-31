const tf = require('@tensorflow/tfjs'); 
const fs = require('fs');
const path = require('path');

const INPUT_SIZE = 60;
const NUM_IDEAS = 30;
const NUM_SAMPLES = 5000;

async function trainAndSaveModel() {
    

    const model = tf.sequential();

    model.add(tf.layers.dense({
        inputShape: [INPUT_SIZE],
        units: 256,
        activation: 'relu',
        kernelRegularizer: tf.regularizers.l2({ l2: 0.01 })
    }));
    model.add(tf.layers.batchNormalization());
    model.add(tf.layers.dropout({ rate: 0.3 }));

    model.add(tf.layers.dense({ units: 128, activation: 'relu' }));
    model.add(tf.layers.dense({ units: 64, activation: 'elu' }));
    model.add(tf.layers.dense({ units: NUM_IDEAS, activation: 'softmax' }));

    model.compile({
        optimizer: tf.train.adam(0.0005),
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
    });

    const { inputs, labels } = generateMassiveData();

    const xs = tf.tensor2d(inputs);
    const ys = tf.tensor2d(labels);

    

    await model.fit(xs, ys, {
        epochs: 100,
        batchSize: 64,
        validationSplit: 0.2,
        shuffle: true,
        callbacks: {
            onEpochEnd: (epoch, logs) => {
                if (epoch % 10 === 0) {
                }
            }
        }
    });
    const savePath = path.join(__dirname, 'exported-model');
    if (!fs.existsSync(savePath)) fs.mkdirSync(savePath);
    const artifacts = await model.save(tf.io.withSaveHandler(async (art) => art));
    
    fs.writeFileSync(
        path.join(savePath, 'model.json'),
        JSON.stringify(artifacts.modelTopology)
    );

    fs.writeFileSync(
        path.join(savePath, 'weights.bin'),
        Buffer.from(artifacts.weightData)
    );

    const modelJson = JSON.parse(fs.readFileSync(path.join(savePath, 'model.json')));
    modelJson.weightsManifest = [{
        paths: ['./weights.bin'],
        weights: artifacts.weightSpecs
    }];
    fs.writeFileSync(path.join(savePath, 'model.json'), JSON.stringify(modelJson, null, 2));

}

function generateMassiveData() {
    const inputs = [];
    const labels = [];
    for (let i = 0; i < NUM_SAMPLES; i++) {
        const encoding = new Array(INPUT_SIZE).fill(0);
        const level = Math.random(); 
        const typeIdx = Math.floor(Math.random() * 9); 
        const goalIdx = Math.floor(Math.random() * 7); 
        
        encoding[30] = level;
        encoding[31 + typeIdx] = 1;
        encoding[40 + goalIdx] = 1;

        let idealIdeaIndex = 0;
        if (typeIdx === 0) idealIdeaIndex = level < 0.5 ? 1 : 2;
        else if (typeIdx === 5) idealIdeaIndex = level > 0.6 ? 15 : 14; 
        else if (typeIdx === 4) idealIdeaIndex = 25;
        else if (typeIdx === 1) idealIdeaIndex = level > 0.5 ? 5 : 4;
        else if (typeIdx === 2) idealIdeaIndex = 10;
        else idealIdeaIndex = (typeIdx * 3) % NUM_IDEAS;

        inputs.push(encoding);
        const label = new Array(NUM_IDEAS).fill(0);
        label[idealIdeaIndex] = 1;
        labels.push(label);
    }
    return { inputs, labels };
}

trainAndSaveModel();