import sql from "../config/db.js";

export const getUserCreations = async (req, res) => {
  try {
    const { userId } = req.auth();

    const creation =
      await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;
    return res.status(200).json({ sucess: true, creation });
  } catch (error) {
    console.log("Error in getUserCreations controllers: ", error.message);
    return res.status(500).json({ sucess: false, message: error.message });
  }
};

export const getPublishedCreations = async (req, res) => {
  try {
    const creation =
      await sql`SELECT * FROM creations WHERE user_id = publish = true ORDER BY created_at DESC`;
    return res.status(200).json({ sucess: true, creation });
  } catch (error) {
    console.log("Error in getPublishedCreations controllers: ", error.message);
    return res.status(500).json({ sucess: false, message: error.message });
  }
};

export const toggleLikeCreations = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    const [creation] = await sql`SELECT * FROM creations WHERE id = ${id}`;

    if (!creation) {
      return res
        .status(404)
        .json({ sucess: false, message: "Creations not found" });
    }

    const currentLikes = creation.likes;
    const userIdStr = userId.toString();
    let updatedLikes;
    let message;

    if (currentLikes.includes(userIdStr)) {
      updatedLikes = creations.filter((user) => user !== userIdStr);
      message = "Creation unliked";
    } else {
      updatedLikes = [...currentLikes, userIdStr];
      message = "Creation Liked";
    }
    
    const fromattedArray = `{${updatedLikes.json(',')}}`

    await sql`UPDATE creations WHERE SET likes = ${fromattedArray}::text[] WHERE id = ${id}`;
    return res.status(200).json({ sucess: true, message });
  } catch (error) {
    console.log("Error in toggleLikeCreations controllers: ", error.message);
    return res.status(500).json({ sucess: false, message: error.message });
  }
};
