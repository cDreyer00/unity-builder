function wait(secs){
    return new Promise(resolve => setTimeout(resolve, secs * 1000))
}

module.exports = wait;