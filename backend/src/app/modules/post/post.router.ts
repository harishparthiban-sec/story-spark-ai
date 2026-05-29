import express from "express";
import { postController } from "./post.controller";
import { protect } from "../../middlewares/auth.middleware"; 
// FIXED: Imported the centralized request limit validation middleware
import { checkRequestLimit } from "../../middlewares/quota.middleware"; 

const router = express.Router();

/* ============================================================
   PATCHED MODULE ROUTES — GSSoC '26 RESOURCE MANAGEMENT
   ============================================================ */

// ... your alternate standard post routes (get, delete, update) ...

/**
 * @route   POST /api/v1/post/remix
 * @desc    Remix an existing story prompt variant using AI models
 * @access  Private (Quota Monitored)
 */
router.post(
  "/remix",
  protect,
  checkRequestLimit, // <-- FIXED: Blocks requests here if user exceeded monthly quota
  postController.remixStory
);

/**
 * @route   POST /api/v1/post/translate
 * @desc    Translate generated story variations into alternative languages
 * @access  Private (Quota Monitored)
 */
router.post(
  "/translate",
  protect,
  checkRequestLimit, // <-- FIXED: Blocks requests here if user exceeded monthly quota
  postController.translateStory
);

export const PostRouter = router;
