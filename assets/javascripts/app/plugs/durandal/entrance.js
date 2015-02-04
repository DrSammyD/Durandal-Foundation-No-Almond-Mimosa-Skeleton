define(['durandal/system', 'durandal/composition', 'velocity', 'q'], function(system, composition, v, q) {
    v.Promise = q.Promise;
    var entrance = function(context) {
        var queue = [];
        if(context.activeView){
            queue.push(v.animate(context.activeView, {
                    opacity: 0
                }, 300));
            queue[0].then(function(){                
                context.triggerAttach();
            });
        }

        if(context.child){
            queue.push(v.animate(context.child, {
                    opacity: [1,0]
                },{display:'inherit'}, 300));
        }

        v.Utilities.queue(queue);
        return queue.slice(1)[0];        
    };

    return entrance;
});