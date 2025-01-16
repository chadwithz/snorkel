export interface PostStatus {
  data: Data;
}

export interface Data {
  story_create: StoryCreate;
}

export interface StoryCreate {
  story_id: null;
  post_id: null;
  publishing_flow: string;
  story: Story;
}

export interface Story {
  id: string;
  scheduled_publish_time: null;
  url: string;
  legacy_story_hideable_id: string;
  is_marked_as_spam_by_admin_assistant: boolean;
  is_anonymous: boolean;
  default_actor: DefaultActor;
  if_viewer_can_learn_more_about_pending_post: null;
  should_render_p2r_after_creation_upsell_comet: boolean;
  composer_end_page_renderer: null;
  to: null;
  work_shared_draft_post_title: null;
  work_shared_draft_final_author: null;
  work_shared_draft_post_status: null;
  work_shared_draft_scheduled_time: null;
  viewer: Viewer;
}

export interface DefaultActor {
  __typename: string;
  id: string;
}

export interface Viewer {
  is_member_of_readonly_work_company: boolean;
}

export class CreateFacebookPostResponseDto implements PostStatus {
  data: Data;

  constructor(data: Data) {
    this.data = data;
  }
}

export class CreateFacebookResponseErrDto {
  status: number;
  data: any;
  isError: boolean;

  constructor(status: number, isError: boolean, data: any) {
    this.isError = isError;
    this.status = status;
    this.data = data;
  }
}
