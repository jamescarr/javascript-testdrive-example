(function(){var mod=function(require, exports){

  // Constructor
  // Creates a new node
  var TreeNode = function(name, content){
    if(name === null || typeof name === "undefined")
      throw new Error("Node name HAS to be provided");

    this._parent = null;
    this._name = name;
    this._content = content;
    this._children = [];
    this._childrenHash = {};
  };

  TreeNode.max = function(array){
    return Math.max.apply(Math, array);
  };

  TreeNode.min = function(array){
    return Math.min.apply(Math, array);
  };

  TreeNode.prototype ={
    // Adds the specified child node to the receiver node.  The child node's
    // parent is set to be the receiver.  The child is added as the last child in
    // the current list of children for the receiver node.
    add : function(child){
      if(typeof this._childrenHash[child.getName()] != "undefined")
        throw "Child already added";

      this._children.push(child);
      this._childrenHash[child.getName()] = this._children.length - 1;

      child.setParent(this);
      return child;
    },

    // Removes the specified child node from the receiver node.  The removed
    // children nodes are orphaned but available if an alternate reference
    // exists.
    //
    // Returns the child node.
    remove : function(child){
      if(child && child.getParent() == this){
        var index = this._childrenHash[child.getName()];
        this._children.splice(index, 1);
        delete this._childrenHash[child.getName()];
        child.setAsRoot();
      }
      return child;
    },

    // Removes this node from its parent. If this is the root node, then does
    // nothing.
    removeFromParent : function(){
      if(this.isRoot())
        return;
      this.getParent().remove(this);
    },

    // Removes all children from the receiver node.
    removeAll : function(){
      this.eachChild(function(child){
        child.setAsRoot();
      }, this);

      this._children = [];
      this._childrenHash = {};
    },

    // Returns the requested node from the set of immediate children by the name
    // of the child node
    get : function(name){
      if(name === null || typeof name === "undefined")
        return null;
      var index = this._childrenHash[name];
      return this.getAt(index);
    },

    // Returns the requested node from the set of immediate children by the
    // position of the child node
    getAt : function(index){
      if(index === null || typeof index === "undefined")
        return null;
      return (this._children[index] || null);
    },

    // Returns the content of the requested node. Returns null if the requested
    // node has no content specified.
    getContent : function(){
      return this._content;
    },

    // Returns the name of the requested node.
    getName : function(){
      return this._name;
    },

    // Returns the immediate parent of the requested node.
    getParent : function(){
      return this._parent;
    },

    // Returns an array of ancestors in reversed order (the first element is the
    // immediate parent). Returns nil if this is a root node.
    getAllParents : function(){
      if(this.isRoot())
        return null;

      var parentArray = [];
      var previousParent = this.getParent();
      while(previousParent){
        parentArray.push(previousParent);
        previousParent = previousParent.getParent();
      }    
      return parentArray;    
    },

    // Returns the first child of this node. Will return null if no children are
    // present.
    getFirstChild : function(){
      return this._children[0];
    },

    // Returns the last child of this node. Will return nil if no children are
    // present.
    getLastChild : function(){
      return this._children[this._children.length - 1];
    },

    // Returns the root for this tree. Root's root is itself.
    getRoot : function(){
      var root = this
      while(!root.isRoot()){
        root = root.getParent();
      }
      return root;
    },

    // Returns the first sibling for this node. If this is the root node, returns
    // itself
    getFirstSibling : function(){
      if(this.isRoot())
        return this;
      return this.getParent()._children[0];
    },

    // Returns the last sibling for this node.  If this node is the root, returns
    // itself
    getLastSibling : function(){
      if(this.isRoot())
        return this;
      return this.getParent()._children[this._children.length - 1];
    },

    // Returns the next sibling for this node. Will return null if no subsequent
    // node is present.
    getNextSibling : function(){
      var index = this.position();
      if(index == -1 ||  index == this.getParent().size() -1 )
        return null;

      return this.getParent()._children[index+1];
    },

    position : function(){
      if(this.isRoot())
        return -1;
      var nodes = this.getParent()._children;
      for(var i=0; i< nodes.length; i++){
        if(nodes[i] == this)
          return i;
      }
      return -1;
    },

    // Returns the previous sibling for this node. Will return null if no 
    // subsequent node is present.
    getPreviousSibling : function(){
      var index = this.position();
      if(index <= 0 )
        return null;

      return this.getParent()._children[index-1];
    },

    // Sets the content of the requested node to the specified content.
    setContent : function(content){
      this._content = content;
    },

    // Indicates whether this node has any associated content.
    hasContent : function(){
      return (this.getContent() != null && typeof this.getContent() != "undefined");
    },

    // Indicates whether this node has any immediate child nodes.
    hasChildren : function(){
      return (this._children.length > 0)
    },

    // Indicates whether this node is a root node. Note that
    // orphaned children will also be reported as root nodes.
    isRoot : function(){
      return (this._parent == null);
    },

    // Indicates whether this node is a 'leaf' - i.e., one without
    // any children
    isLeaf : function(){
      return (!this.hasChildren());
    },

    // Returns true if this node is the first sibling.
    isFirstSibling : function(){
      return (this.getFirstSibling() === this);
    },

    // Returns true if this node is the last sibling.
    isLastSibling : function(){
     return (this.getLastSibling() === this);
    },

    // Returns true if this node is the only child of its parent
    isOnlyChild : function(){
      if(this.isRoot()) return true; 
      return (this.getParent()._children.length == 1);
    },

    // If a function is given,
    // yields each child node to the block.
    eachChild : function(fn, scope){
      if(typeof fn == "function"){
        for(var i=0; i<this._children.length; i++){
          fn.call(scope, this._children[i]);
        }
      }
    },

    // Returns an array of siblings for this node.
    // If a block is provided, yields each of the sibling
    // nodes to the block. The root always has null siblings.
    eachSibling : function(fn, scope){
      if(this.isRoot()) return null;

      this.getParent().eachChild(function(sibling){
        if(sibling != this)
          fn.call(scope, sibling);
      }, this);
    },

    // Returns every node (including the receiver node) from the tree to the
    // specified block. The traversal is depth first and from left to right in
    // pre-ordered sequence.
    preorderedEach : function(fn, scope){
      fn.call(scope, this);
      this.eachChild(function(child){
        child.preorderedEach(fn, scope);
      }, this);  
    },

    // Performs breadth first traversal of the tree rooted at this node. The
    // traversal in a given level is from left to right.
    breadthEach : function(fn, scope){
      var nodeQueue = [this];

      // Use a queue to do breadth traversal
      while(nodeQueue.length > 0){
        var nodeToTraverse = nodeQueue.shift()
        fn.call(scope, nodeToTraverse);
        // Enqueue the children from left to right.
        nodeToTraverse.eachChild(function(child){
          nodeQueue.push(child);
        }, this);
      }
    },

    // Yields all leaf nodes from this node to the specified block. May yield
    // this node as well if this is a leaf node.  Leaf traversal depth first and
    // left to right.
    eachLeaf : function(fn, scope){
      this.each(function(node){
        if(node.isLeaf())
          fn.call(scope, node);
      }, this);
    },

    // Returns the total number of nodes in this tree, rooted at the receiver
    // node.
    length : function(){
      return this._children.length;
    },

    // Returns depth of the tree from this node. A single leaf node has a
    // depth of 1.
    depth : function(){
      var depth = 1;
      if(!this.isLeaf()){
        var ary = [];
        this.eachChild(function(child){
          ary.push(child.depth());
        }, this);
        depth += TreeNode.max(ary);
      }
      return depth;
    },

    // Returns breadth of the tree at this node level. A single node has a
    // breadth of 1.
    breadth : function(){
      if(this.isRoot())
        return 1;

      return this.getParent().size();
    },

    // Protected method to set the parent node.
    // This method should NOT be invoked by client code.
    setParent : function(node){
      this._parent = node;
    },

    // Protected method which sets this node as a root node.
    setAsRoot : function(){
      this.setParent(null);
    }
  }

  // @see #size
  TreeNode.prototype.size = TreeNode.prototype.length;
  TreeNode.prototype.each = TreeNode.prototype.preorderedEach;

  //export
  exports.TreeNode = TreeNode;
};require.install ? require.install('Inspec.util',mod) : mod(require, exports);})();