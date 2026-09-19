loader.load(

  "./assets/Model.glb",

  (gltf)=>{

      const model = gltf.scene;

      const isMobile = window.innerWidth < 768;

      if(isMobile){

          model.scale.set(
            1.0,
            1.0,
            1.0
          );

          model.position.set(
            0,
            -0.15,
            0
          );

          camera.position.set(
            0,
            1.1,
            2.8
          );

      }else{

          model.scale.set(
            1.3,
            1.3,
            1.3
          );

          model.position.set(
            0,
            -0.3,
            0
          );

          camera.position.set(
            0,
            1.5,
            4
          );
      }

      scene.add(model);

      controls.target.set(
        0,
        0.8,
        0
      );

      console.log("Loaded");
  },

  (xhr)=>{

      console.log(
        ((xhr.loaded / xhr.total) * 100).toFixed(0)
        + "% loaded"
      );
  },

  (error)=>{

      console.error(
        "Model failed:",
        error
      );
  }
);
