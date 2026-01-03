const DepthAwarePixel2Mesh = () => {
  return (
    <article className="prose prose-lg max-w-none">
      <p className="mb-6">
        <a
          href="http://cs231n.stanford.edu/"
          className="text-blue-600 hover:text-blue-800"
        >
          CS 231 (Deep Learning for Computer Vision)
        </a>{" "}
        has probably been my favorite class at Stanford so far. It was
        incredibly well taught and also dove deeper into many of the topics I
        found to be especially interesting when doing my own ML/DL research
        throughout the years. Even as early as high school, I remember watching{" "}
        <a
          href="https://www.youtube.com/watch?v=NfnWJUyUJYU&list=PLkt2uSq6rBVctENoVBg1TpCC7OQi31AlC&pp=iAQB"
          className="text-blue-600 hover:text-blue-800"
        >
          Andrej Karpathy's CS 231N
        </a>{" "}
        lectures on YouTube, and it was actually one of the reasons that got me
        excited to apply for Stanford in the first place.
      </p>

      <p className="mb-6">
        The course consists of a wide variety of topics, but I wanted to more
        specifically share my final project, which I had the pleasure of working
        on with Julian Quevedo and Rohin Manvi. If you would like to read the
        original paper, you can find it{" "}
        <a
          href="/assets/pdf/231N_Final_Paper.pdf"
          className="text-blue-600 hover:text-blue-800"
        >
          here
        </a>
        .
      </p>

      {/* Background */}
      <h2 className="text-2xl font-semibold mb-4">Background</h2>
      <p className="mb-4">
        Current advances in the computer vision space have become increasingly
        accurate in object detection when given 2D inputs.
      </p>
      <ul className="mb-6">
        <li>Models like Mask R-CNN</li>
        <li>Instance and semantic segmentation</li>
      </ul>

      <img
        src="/assets/img/231n/231n1.png"
        alt="Overview"
        className="w-full rounded-lg mb-6"
      />

      <p className="mb-4">Mesh R-CNN is one major advancement in this space</p>
      <ul className="mb-6">
        <li>
          Constructs topologically accurate 3D meshes given a 2D RGB image using
          voxel representations
        </li>
        <li>
          Translates these voxel representations into a mesh using a GNN-based
          approach
        </li>
      </ul>

      {/* Proposed Solution */}
      <h2 className="text-2xl font-semibold mb-4">Proposed Solution</h2>
      <p className="mb-6">
        Current systems lack a major component of object recognition that we as
        humans use to perceive the world around us - <i>depth</i>.
      </p>

      <div className="space-y-4 mb-6">
        <img
          src="/assets/img/231n/231n2.png"
          alt="Current Methods"
          className="w-full rounded-lg"
        />
        <img
          src="/assets/img/231n/231n3.png"
          alt="Depth"
          className="w-full rounded-lg"
        />
      </div>

      {/* Methodology and Results */}
      <h2 className="text-2xl font-semibold mb-4">Methodology and Results</h2>

      <h3 className="text-xl font-semibold mb-4">
        Phase 1: Differentiable Rendering
      </h3>
      <p className="mb-4">
        In order to provide further supervision on our generated meshes, we
        considered augmenting the loss with differentiable rendering.
      </p>
      <ul className="mb-6">
        <li>
          Utilize a differentiable rasterizer to render a depth map of it the
          generated mesh
        </li>
        <li>
          Error between the rendered depth map and the "ground-truth" depth
          channel can be measured
        </li>
      </ul>

      <p className="mb-4">
        This would allow our model to take further advantage of the RGB-D images
        by creating a mesh that has the same depth characteristics as the input
        depth map. In order to meaningfully compare the rendered depth maps with
        the ones from the input images we need the following:
      </p>
      <ul className="mb-6">
        <li>The loss must be scale-invariant.</li>
        <li>
          Rendered depth maps must be from the same camera positions as the
          input images.
        </li>
      </ul>

      <p className="mb-4">
        We discovered more difficulties and were unable to fully implement the
        scale-invariant depth loss.
      </p>
      <ul className="mb-6">
        <li>
          MiDaS hallucinates a ground plane beneath the ShapeNet renderings.
        </li>
        <li>
          The differentiable renderer simply marks all background points as −1
        </li>
        <li>MiDaS outputs an inverse depth map</li>
      </ul>
      <p className="mb-6">
        We hope to investigate solving both these problems simultanoeously in
        future work.
      </p>

      <img
        src="/assets/img/231n/231n4.png"
        alt="Meshes"
        className="w-full rounded-lg mb-6"
      />

      <h3 className="text-xl font-semibold mb-4">
        RGB-D Backbone and Mesh Refinement Head
      </h3>
      <p className="mb-6">
        To allow Mesh R-CNN to take RGB-D images as input, we changed the first
        ResNet layer to learn four-channel filters instead of three-channel
        filters. We take advantage of pretraining by copying over the weights of
        for the first three channels and only train the fourth from scratch.
      </p>

      <img
        src="/assets/img/231n/231n5.png"
        alt="Architecture"
        className="w-full rounded-lg mb-6"
      />

      <p className="mb-6">
        Chamfer distance and the normal distance are used as losses for the
        mesh. Pointclouds P and Q are sampled from the ground truth and the
        intermediate mesh predictions from the model.
      </p>

      <img
        src="/assets/img/231n/231n6.png"
        alt="Losses"
        className="w-full rounded-lg mb-6"
      />

      {/* Dataset and Features */}
      <h2 className="text-2xl font-semibold mb-4">Dataset and Features</h2>
      <p className="mb-6">
        We trained our model on two datasets: ShapeNet Core (along with
        renderings from R2N2) and Pix3D. ShapeNet Core consists of over 50,000
        3D meshes, which R2N2 provides rendered images of.
      </p>

      <img
        src="/assets/img/231n/231n7.png"
        alt="ShapeNet"
        className="w-full rounded-lg mb-6"
      />

      <p className="mb-6">
        We use MiDaS to predict each image's depth map which we stack to produce
        four-channel RGB-D images.
      </p>

      {/* Results and Future Work */}
      <h2 className="text-2xl font-semibold mb-4">Results and Future Work</h2>
      <p className="mb-6">
        Adding depth resulted in a clear improvement for Pixel2Mesh, but seemed
        to make little difference for Mesh R-CNN.
      </p>

      <img
        src="/assets/img/231n/231n8.png"
        alt="Results Table"
        className="w-full rounded-lg mb-6"
      />

      <p className="mb-4">
        A possible extension is to construct colored meshes
      </p>
      <ul className="mb-6">
        <li>
          Accurately represent textures and materials that appear in images
        </li>
        <li>
          Since we represent the meshes as graphs, our idea is to incorporate
          color information as an additional node feature
        </li>
        <li>
          Thus, as supervision for our color predictions, we need the meshes in
          the datasets to have vertex colorings
        </li>
        <li>
          To enable Mesh R-CNN to predict the color of each vertex, we plan to
          increase the dimension of the node features predicted by the mesh
          refinement stage
        </li>
        <li>
          Instead of predicting 3-dimensional features, we will predict
          6-dimensional features, where the first three correspond to the vertex
          coordinate and the second three correspond to RGB values
        </li>
      </ul>

      <p className="mb-6">
        We also plan to continue the unfinished work on using differentiable
        rendering and the depth images during training. We hope to overcome the
        aforementioned roadblocks and hypothesize that due to the additional
        information fed in during training time, it is likely to outperform the
        results exhibited by the current depth-aware Pixel2Mesh.
      </p>
    </article>
  );
};

export default DepthAwarePixel2Mesh;
