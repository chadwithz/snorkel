import { Injectable } from '@nestjs/common';
import axios, { Axios, AxiosError } from 'axios';
import { v4 as uuid } from 'uuid';
import FormData from 'form-data';
import { writeFile } from "node:fs/promises";

import { CreateFacebookDto } from './dto/create-facebook.dto';
import { UpdateFacebookDto } from './dto/update-facebook.dto';
import { getCookieFromFile } from 'src/utils/cookies';
import { CreateFacebookPostDto, Visibility } from './dto/create-facebook-post/create-facebook-post.dto';
import { CreateFacebookStatusResponseErrDto, PostStatus } from './dto/create-facebook-post/create-facebook-post.res';
import { formatFilenameWithTimestamp } from 'src/utils/filename';
import { DeleteFacebookStatusDto } from './dto/delete-facebook-post/delete-facebook.dto';
import { DeleteFacebookStatusResponseErrDto } from './dto/delete-facebook-post/delete-facebook-response.dto';
import { ChangeFacebookProfilePicDto } from './dto/change-profile-pic/change-profile-pic.dto';
import { ChangeFacebookProfilePicErrResponseDto, ChangeFacebookProfilePicSuccessResponseDto } from './dto/change-profile-pic/change-profile-pic-res.dto';
import { UpdateFacebookStatusWithImageDto } from './dto/update-facebook-post-with-image/update-facebook-status-with-image.dto';
import { UpdateFacebookStatusWithImageErrDto, UpdateFacebookStatusWithImageResponseDto } from './dto/update-facebook-post-with-image/update-facebook-status-with-image.res.dto';
import { UpdateFacebookStatusWithVideoDto } from './dto/update-facebook-status-with-video/update-facebook-status-with-video.dto';
import { UpdateFacebookStatusWithVideoErrResponseDto, UpdateFacebookStatusWithVideoResponseDto } from './dto/update-facebook-status-with-video/update-facebook-status-with-video-res.dto';
import { generateDTSG, getProfileID } from './common/utils/cookies';

@Injectable()
export class FacebookService {
  create(createFacebookDto: CreateFacebookDto) {
    return 'This action adds a new facebook';
  }

  findAll() {
    return `This action returns all facebook`;
  }

  findOne(id: number) {
    return `This action returns a #${id} facebook`;
  }

  update(id: number, updateFacebookDto: UpdateFacebookDto) {
    return `This action updates a #${id} facebook`;
  }

  remove(id: number) {
    return `This action removes a #${id} facebook`;
  }

  async postStatus(createFacebookPostDto: CreateFacebookPostDto) {
    const cookie = getCookieFromFile();
    const profileID = getProfileID();
    const uuidv4 = uuid();
    const status = createFacebookPostDto.content;
    const visibility = createFacebookPostDto.visibility;

    const DTSG = await generateDTSG();
    const DOC_ID = '8974307139316999';

    const variables = visibility === Visibility.FRIENDS ? `{"input":{"composer_entry_point":"inline_composer","composer_source_surface":"newsfeed","composer_type":"feed","idempotence_token":"${uuidv4}_FEED","source":"WWW","audience":{"privacy":{"allow":[],"base_state":"FRIENDS","deny":["794014068290587"],"tag_expansion_state":"UNSPECIFIED"}},"message":{"ranges":[],"text":"${status}"},"inline_activities":[],"text_format_preset_id":"0","publishing_flow":{"supported_flows":["ASYNC_SILENT","ASYNC_NOTIF","FALLBACK"]},"logging":{"composer_session_id":"1cddaa25-3ea5-4377-9dc8-ef29502d0b42"},"navigation_data":{"attribution_id_v2":"CometHomeRoot.react,comet.home,logo,1736743708885,152392,4748854339,,"},"tracking":[null],"event_share_metadata":{"surface":"newsfeed"},"actor_id":"${profileID}","client_mutation_id":"3"},"feedLocation":"NEWSFEED","feedbackSource":1,"focusCommentID":null,"gridMediaWidth":null,"groupID":null,"scale":1,"privacySelectorRenderLocation":"COMET_STREAM","checkPhotosToReelsUpsellEligibility":true,"renderLocation":"homepage_stream","useDefaultActor":false,"inviteShortLinkKey":null,"isFeed":true,"isFundraiser":false,"isFunFactPost":false,"isGroup":false,"isEvent":false,"isTimeline":false,"isSocialLearning":false,"isPageNewsFeed":false,"isProfileReviews":false,"isWorkSharedDraft":false,"hashtag":null,"canUserManageOffers":false,"__relay_internal__pv__CometUFIShareActionMigrationrelayprovider":true,"__relay_internal__pv__GHLShouldChangeSponsoredDataFieldNamerelayprovider":false,"__relay_internal__pv__GHLShouldChangeAdIdFieldNamerelayprovider":false,"__relay_internal__pv__IsWorkUserrelayprovider":false,"__relay_internal__pv__CometUFIReactionsEnableShortNamerelayprovider":false,"__relay_internal__pv__CometFeedStoryDynamicResolutionPhotoAttachmentRenderer_experimentWidthrelayprovider":500,"__relay_internal__pv__CometImmersivePhotoCanUserDisable3DMotionrelayprovider":false,"__relay_internal__pv__IsMergQAPollsrelayprovider":false,"__relay_internal__pv__FBReelsMediaFooter_comet_enable_reels_ads_gkrelayprovider":false,"__relay_internal__pv__StoriesArmadilloReplyEnabledrelayprovider":true,"__relay_internal__pv__EventCometCardImage_prefetchEventImagerelayprovider":false,"__relay_internal__pv__GHLShouldChangeSponsoredAuctionDistanceFieldNamerelayprovider":false}` : `{"input":{"composer_entry_point":"inline_composer","composer_source_surface":"timeline","idempotence_token":"${uuidv4}_FEED","source":"WWW","attachments":[],"audience":{"privacy":{"allow":[],"base_state":"EVERYONE","deny":[],"tag_expansion_state":"UNSPECIFIED"}},"message":{"ranges":[],"text":"${status}"},"with_tags_ids":null,"inline_activities":[],"text_format_preset_id":"0","publishing_flow":{"supported_flows":["ASYNC_SILENT","ASYNC_NOTIF","FALLBACK"]},"logging":{"composer_session_id":"c2f297ee-ab8d-4654-ae69-2473f738d0a4"},"navigation_data":{"attribution_id_v2":"ProfileCometTimelineListViewRoot.react,comet.profile.timeline.list,via_cold_start,1737007984884,23722,190055527696468,,"},"tracking":[null],"event_share_metadata":{"surface":"newsfeed"},"actor_id":"${profileID}","client_mutation_id":"1"},"feedLocation":"TIMELINE","feedbackSource":0,"focusCommentID":null,"gridMediaWidth":230,"groupID":null,"scale":1,"privacySelectorRenderLocation":"COMET_STREAM","checkPhotosToReelsUpsellEligibility":true,"renderLocation":"timeline","useDefaultActor":false,"inviteShortLinkKey":null,"isFeed":false,"isFundraiser":false,"isFunFactPost":false,"isGroup":false,"isEvent":false,"isTimeline":true,"isSocialLearning":false,"isPageNewsFeed":false,"isProfileReviews":false,"isWorkSharedDraft":false,"hashtag":null,"canUserManageOffers":false,"__relay_internal__pv__CometUFIShareActionMigrationrelayprovider":true,"__relay_internal__pv__GHLShouldChangeSponsoredDataFieldNamerelayprovider":true,"__relay_internal__pv__GHLShouldChangeAdIdFieldNamerelayprovider":false,"__relay_internal__pv__IsWorkUserrelayprovider":false,"__relay_internal__pv__CometUFIReactionsEnableShortNamerelayprovider":false,"__relay_internal__pv__CometFeedStoryDynamicResolutionPhotoAttachmentRenderer_experimentWidthrelayprovider":500,"__relay_internal__pv__CometImmersivePhotoCanUserDisable3DMotionrelayprovider":false,"__relay_internal__pv__IsMergQAPollsrelayprovider":false,"__relay_internal__pv__FBReelsMediaFooter_comet_enable_reels_ads_gkrelayprovider":false,"__relay_internal__pv__StoriesArmadilloReplyEnabledrelayprovider":true,"__relay_internal__pv__EventCometCardImage_prefetchEventImagerelayprovider":false,"__relay_internal__pv__GHLShouldChangeSponsoredAuctionDistanceFieldNamerelayprovider":false}`;

    const response = await axios.post<CreateFacebookStatusResponseErrDto, { data: PostStatus; }>(
      'https://www.facebook.com/api/graphql/',
      new URLSearchParams({
        'fb_dtsg': DTSG.payload.token,
        'variables': variables,
        'doc_id': DOC_ID,
      }),
      {
        headers: {
          'Cookie': cookie,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    ).catch((error) => {
      if (error instanceof AxiosError) {
        return new CreateFacebookStatusResponseErrDto(error.response.status, true, error.response.data);
      }
    });

    if (response instanceof CreateFacebookStatusResponseErrDto) {
      return response.data;
    }

    await writeFile(`facebook-posting-${formatFilenameWithTimestamp('json')}`, JSON.stringify(response.data));
    return "Success posting to Facebook";
  }

  async deleteStatus(deleteFacebookStatus: DeleteFacebookStatusDto) {
    const cookie = getCookieFromFile();
    const profileID = getProfileID();

    const story_id = deleteFacebookStatus.story_id;

    const DTSG = await generateDTSG();
    const DOC_ID = "8892148317505650";

    const response = await axios.post<DeleteFacebookStatusResponseErrDto, { data: string }>(
      'https://www.facebook.com/api/graphql/',
      new URLSearchParams({
        'fb_dtsg': DTSG.payload.token,
        'doc_id': DOC_ID,
        'variables': `{"input":{"story_id":"${story_id}","story_location":"PERMALINK","actor_id":"${profileID}","client_mutation_id":"1"},"groupID":null,"inviteShortLinkKey":null,"renderLocation":null,"scale":1}`
      }),
      {
        headers: {
          'cookie': cookie,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    ).catch((error) => {
      if (error instanceof AxiosError) {
        return new DeleteFacebookStatusResponseErrDto(error.response.status, true, error.response.data);
      }
    })

    if (response instanceof DeleteFacebookStatusResponseErrDto) {
      return response.data
    }

    await writeFile(`facebook-delete-post-${formatFilenameWithTimestamp('json')}`, JSON.stringify(response.data));
    return "Success deleting";
  }

  async changeProfilePic(changeFacebookProfilePicDto: ChangeFacebookProfilePicDto) {
    const cookie = getCookieFromFile();
    const profileID = getProfileID();
    const file = changeFacebookProfilePicDto.file;

    const DTSG = await generateDTSG();
    const DOC_ID = '8817605414991162';
    const form = new FormData();

    form.append('file', file);

    const first_step = await axios.post<ChangeFacebookProfilePicErrResponseDto, { data: string }>(
      'https://www.facebook.com/profile/picture/upload/',
      form,
      {
        params: {
          'profile_id': profileID,
          'photo_source': '57',
          '__a': '1',
          'fb_dtsg': DTSG.payload.token,
        },
        headers: {
          ...form.getHeaders(),
          'cookie': cookie,
        }
      }
    )
      .catch((error) => {
        if (error instanceof AxiosError) {
          return new ChangeFacebookProfilePicErrResponseDto(error.response.status, true, error.response.data);
        }
      });

    if (first_step instanceof ChangeFacebookProfilePicErrResponseDto) {
      return first_step.data;
    }

    const res = new ChangeFacebookProfilePicSuccessResponseDto(first_step.data);
    const photo_id = res.payload.fbid;

    const second_step = await axios.post<ChangeFacebookProfilePicErrResponseDto, { data: string }>(
      'https://www.facebook.com/api/graphql/',
      new URLSearchParams({
        'fb_dtsg': DTSG.payload.token,
        'variables': `{"input":{"attribution_id_v2":"ProfileCometTimelineListViewRoot.react,comet.profile.timeline.list,tap_bookmark,1736961093426,725768,100030460027249,,","caption":"","existing_photo_id":"${photo_id}","expiration_time":null,"profile_id":"${profileID}","profile_pic_method":"EXISTING","profile_pic_source":"TIMELINE","scaled_crop_rect":{"height":0.80983,"width":1,"x":0,"y":0.09508},"skip_cropping":true,"actor_id":"${profileID}","client_mutation_id":"2"},"isPage":false,"isProfile":true,"sectionToken":"UNKNOWN","collectionToken":"UNKNOWN","scale":1,"__relay_internal__pv__ProfileGeminiIsCoinFlipEnabledrelayprovider":false}`,
        'doc_id': DOC_ID
      }),
      {
        headers: {
          'cookie': cookie,
        }
      }
    ).catch((error) => {
      if (error instanceof AxiosError) {
        return new ChangeFacebookProfilePicErrResponseDto(error.response.status, true, error.response.data);
      }
    });

    if (second_step instanceof ChangeFacebookProfilePicErrResponseDto) {
      return second_step.data;
    }

    await writeFile(`facebook-change-profile-pic-${formatFilenameWithTimestamp('json')}`, JSON.stringify(second_step.data));
    return "Success changing profile pic"

  }

  // TODO: handle multiple files
  async updateStatusWithImage(updateFacebookStatusWithImageDto: UpdateFacebookStatusWithImageDto) {
    const { file, text, visibility } = updateFacebookStatusWithImageDto;

    const cookie = getCookieFromFile();
    const profileID = getProfileID();
    const uuidv4 = uuid();

    const DTSG = await generateDTSG();
    const DOC_ID = '8997492047006365';
    let photo_id = "";

    // TODO: probably causes problem
    const variables = visibility === Visibility.FRIENDS ? `{"input":{"composer_entry_point":"inline_composer","composer_source_surface":"timeline","idempotence_token":"${uuidv4}_FEED","source":"WWW","attachments":[{"photo":{"id":"${photo_id}"}}],"audience":{"privacy":{"allow":[],"base_state":"FRIENDS","deny":[],"tag_expansion_state":"UNSPECIFIED"}},"message":{"ranges":[],"text":"${text}"},"with_tags_ids":[],"inline_activities":[],"text_format_preset_id":"0","publishing_flow":{"supported_flows":["ASYNC_SILENT","ASYNC_NOTIF","FALLBACK"]},"logging":{"composer_session_id":"4dc40028-8e2c-4308-b289-be4e28d5cb1d"},"navigation_data":{"attribution_id_v2":"ProfileCometTimelineListViewRoot.react,comet.profile.timeline.list,unexpected,1736962877651,990899,190055527696468,,;ProfileCometTimelineListViewRoot.react,comet.profile.timeline.list,via_cold_start,1736962794639,373314,190055527696468,,"},"tracking":[null],"event_share_metadata":{"surface":"newsfeed"},"actor_id":"${profileID}","client_mutation_id":"2"},"feedLocation":"TIMELINE","feedbackSource":0,"focusCommentID":null,"gridMediaWidth":230,"groupID":null,"scale":1,"privacySelectorRenderLocation":"COMET_STREAM","checkPhotosToReelsUpsellEligibility":true,"renderLocation":"timeline","useDefaultActor":false,"inviteShortLinkKey":null,"isFeed":false,"isFundraiser":false,"isFunFactPost":false,"isGroup":false,"isEvent":false,"isTimeline":true,"isSocialLearning":false,"isPageNewsFeed":false,"isProfileReviews":false,"isWorkSharedDraft":false,"hashtag":null,"canUserManageOffers":false,"__relay_internal__pv__CometUFIShareActionMigrationrelayprovider":true,"__relay_internal__pv__GHLShouldChangeSponsoredDataFieldNamerelayprovider":true,"__relay_internal__pv__GHLShouldChangeAdIdFieldNamerelayprovider":false,"__relay_internal__pv__IsWorkUserrelayprovider":false,"__relay_internal__pv__CometUFIReactionsEnableShortNamerelayprovider":false,"__relay_internal__pv__CometFeedStoryDynamicResolutionPhotoAttachmentRenderer_experimentWidthrelayprovider":500,"__relay_internal__pv__CometImmersivePhotoCanUserDisable3DMotionrelayprovider":false,"__relay_internal__pv__IsMergQAPollsrelayprovider":false,"__relay_internal__pv__FBReelsMediaFooter_comet_enable_reels_ads_gkrelayprovider":false,"__relay_internal__pv__StoriesArmadilloReplyEnabledrelayprovider":true,"__relay_internal__pv__EventCometCardImage_prefetchEventImagerelayprovider":false,"__relay_internal__pv__GHLShouldChangeSponsoredAuctionDistanceFieldNamerelayprovider":false}` : `{"input":{"composer_entry_point":"inline_composer","composer_source_surface":"timeline","idempotence_token":"${uuidv4}_FEED","source":"WWW","attachments":[{"photo":{"id":"${photo_id}"}}],"audience":{"privacy":{"allow":[],"base_state":"EVERYONE","deny":[],"tag_expansion_state":"UNSPECIFIED"}},"message":{"ranges":[],"text":"${text}"},"with_tags_ids":null,"inline_activities":[],"text_format_preset_id":"0","publishing_flow":{"supported_flows":["ASYNC_SILENT","ASYNC_NOTIF","FALLBACK"]},"logging":{"composer_session_id":"c2f297ee-ab8d-4654-ae69-2473f738d0a4"},"navigation_data":{"attribution_id_v2":"ProfileCometTimelineListViewRoot.react,comet.profile.timeline.list,via_cold_start,1737007984884,23722,190055527696468,,"},"tracking":[null],"event_share_metadata":{"surface":"newsfeed"},"actor_id":"${profileID}","client_mutation_id":"1"},"feedLocation":"TIMELINE","feedbackSource":0,"focusCommentID":null,"gridMediaWidth":230,"groupID":null,"scale":1,"privacySelectorRenderLocation":"COMET_STREAM","checkPhotosToReelsUpsellEligibility":true,"renderLocation":"timeline","useDefaultActor":false,"inviteShortLinkKey":null,"isFeed":false,"isFundraiser":false,"isFunFactPost":false,"isGroup":false,"isEvent":false,"isTimeline":true,"isSocialLearning":false,"isPageNewsFeed":false,"isProfileReviews":false,"isWorkSharedDraft":false,"hashtag":null,"canUserManageOffers":false,"__relay_internal__pv__CometUFIShareActionMigrationrelayprovider":true,"__relay_internal__pv__GHLShouldChangeSponsoredDataFieldNamerelayprovider":true,"__relay_internal__pv__GHLShouldChangeAdIdFieldNamerelayprovider":false,"__relay_internal__pv__IsWorkUserrelayprovider":false,"__relay_internal__pv__CometUFIReactionsEnableShortNamerelayprovider":false,"__relay_internal__pv__CometFeedStoryDynamicResolutionPhotoAttachmentRenderer_experimentWidthrelayprovider":500,"__relay_internal__pv__CometImmersivePhotoCanUserDisable3DMotionrelayprovider":false,"__relay_internal__pv__IsMergQAPollsrelayprovider":false,"__relay_internal__pv__FBReelsMediaFooter_comet_enable_reels_ads_gkrelayprovider":false,"__relay_internal__pv__StoriesArmadilloReplyEnabledrelayprovider":true,"__relay_internal__pv__EventCometCardImage_prefetchEventImagerelayprovider":false,"__relay_internal__pv__GHLShouldChangeSponsoredAuctionDistanceFieldNamerelayprovider":false}`;

    const form = new FormData();
    form.append('source', '8');
    form.append('profile_id', profileID);
    form.append('waterfallxapp', 'comet');
    form.append('upload_id', 'jsc_c_1');
    form.append('farr', file);

    const step_one = await axios.post<UpdateFacebookStatusWithImageErrDto, { data: string }>(
      'https://upload.facebook.com/ajax/react_composer/attachments/photo/upload',
      form,
      {
        params: {
          '__a': '1',
          'fb_dtsg': DTSG.payload.token
        },
        headers: {
          ...form.getHeaders(),
          'cookie': cookie
        }
      }
    ).catch((error) => {
      if (error instanceof AxiosError) {
        return new UpdateFacebookStatusWithImageErrDto(error.response.status, true, error.response.data);
      }
    });

    if (step_one instanceof UpdateFacebookStatusWithImageErrDto) {
      return step_one.data;
    }

    const res = new UpdateFacebookStatusWithImageResponseDto(step_one.data);
    photo_id = res.payload.photoID;

    const step_two = await axios.post(
      'https://www.facebook.com/api/graphql/',
      new URLSearchParams({
        '__a': '1',
        'fb_dtsg': DTSG.payload.token,
        'variables': variables,
        'doc_id': DOC_ID
      }),
      {
        headers: {
          'cookie': cookie
        }
      }
    ).catch((error) => {
      if (error instanceof AxiosError) {
        return new UpdateFacebookStatusWithImageErrDto(error.response.status, true, error.response.data);
      }
    })

    if (step_two instanceof UpdateFacebookStatusWithImageErrDto) {
      return step_two.data;
    }

    await writeFile(`facebook-update-status-with-pic-${formatFilenameWithTimestamp('json')}`, JSON.stringify(step_two.data));
    return "Success uploading photo";
  }

  // TODO: handle multiple files
  async updateStatusWithVideos(updateFacebookStatusWithVideoDto: UpdateFacebookStatusWithVideoDto) {
    const file = updateFacebookStatusWithVideoDto.file;
    const text = updateFacebookStatusWithVideoDto.text;
    const visibility = updateFacebookStatusWithVideoDto.visibility;

    const cookie = getCookieFromFile();
    const profileID = getProfileID();
    const uuidv4 = uuid();
    const DTSG = await generateDTSG();

    const step_one = await axios.post<UpdateFacebookStatusWithVideoErrResponseDto, { data: string; }>(
      'https://www.facebook.com/ajax/video/upload/requests/start/',
      new URLSearchParams({
        'waterfall_id': '62aecaefa60133c504ee9ac90bffaef7',
        'target_id': profileID,
        'source': 'composer',
        'composer_entry_point_ref': 'timeline',
        'supports_chunking': 'true',
        'supports_file_api': 'true',
        'file_size': `${file.size}`,
        'file_extension': `${file.extension}`,
        'partition_start_offset': '0',
        'partition_end_offset': `${file.size}`,
        'fb_dtsg': DTSG.payload.token
      }),
      {
        params: {
          '__a': '1'
        },
        headers: {
          'x_fb_video_waterfall_id': '62aecaefa60133c504ee9ac90bffaef7',
          'cookie': cookie
        }
      }
    ).catch((error) => {
      if (error instanceof AxiosError) {
        return new UpdateFacebookStatusWithVideoErrResponseDto(error.response.status, true, error.response.data);
      }
    })

    if (step_one instanceof UpdateFacebookStatusWithVideoErrResponseDto) {
      return step_one.data;
    }

    const res = new UpdateFacebookStatusWithVideoResponseDto(step_one.data);
    const media_id = res.payload.video_id;

    const step_two = await axios.post<UpdateFacebookStatusWithVideoErrResponseDto, { data: string; }>(
      `https://rupload-cgk1-2.up.facebook.com/fb_video/f80ced12e601b87b5fdb908d8ce69313-0-${file.size}`, file,
      {
        params: {
          '__a': '1',
          'fb_dtsg': DTSG.payload.token
        },
        headers: {
          'x-entity-name': file.originalName,
          'x-entity-type': file.mimetype,
          'x-entity-length': file.size,
          'offset': '0',
          'start_offset': '0',
          'end_offset': file.size,
          'id': 'undefined',
          'product_media_id': media_id,
          'x-total-asset-size': file.size,
          'cookie': cookie,
          'Content-Type': file.mimetype
        }
      }
    ).catch((error) => {
      if (error instanceof AxiosError) {
        return new UpdateFacebookStatusWithImageErrDto(error.response.status, true, error.response.data);
      }
    })

    if (step_two instanceof UpdateFacebookStatusWithImageResponseDto) {
      return step_two.data;
    }

    // TODO: handle for other visibility
    const step_three = await axios.post(
      'https://www.facebook.com/api/graphql/',
      new URLSearchParams({
        '__a': '1',
        'fb_dtsg': DTSG.payload.token,
        'variables': `{"input":{"composer_entry_point":"inline_composer","composer_source_surface":"timeline","idempotence_token":"${uuidv4}_FEED","source":"WWW","attachments":[{"video":{"id":"${media_id}","notify_when_processed":true}}],"audience":{"privacy":{"allow":[],"base_state":"EVERYONE","deny":[],"tag_expansion_state":"UNSPECIFIED"}},"message":{"ranges":[],"text":"${text}"},"with_tags_ids":null,"inline_activities":[],"text_format_preset_id":"0","publishing_flow":{"supported_flows":["ASYNC_SILENT","ASYNC_NOTIF","FALLBACK"]},"logging":{"composer_session_id":"4762d571-61a8-4251-b193-ab7b1b8c07c4"},"navigation_data":{"attribution_id_v2":"ProfileCometTimelineListViewRoot.react,comet.profile.timeline.list,via_cold_start,1736968837200,315095,190055527696468,,"},"tracking":[null],"event_share_metadata":{"surface":"newsfeed"},"actor_id":"${profileID}","client_mutation_id":"1"},"feedLocation":"TIMELINE","feedbackSource":0,"focusCommentID":null,"gridMediaWidth":230,"groupID":null,"scale":1,"privacySelectorRenderLocation":"COMET_STREAM","checkPhotosToReelsUpsellEligibility":true,"renderLocation":"timeline","useDefaultActor":false,"inviteShortLinkKey":null,"isFeed":false,"isFundraiser":false,"isFunFactPost":false,"isGroup":false,"isEvent":false,"isTimeline":true,"isSocialLearning":false,"isPageNewsFeed":false,"isProfileReviews":false,"isWorkSharedDraft":false,"hashtag":null,"canUserManageOffers":false,"__relay_internal__pv__CometUFIShareActionMigrationrelayprovider":true,"__relay_internal__pv__GHLShouldChangeSponsoredDataFieldNamerelayprovider":true,"__relay_internal__pv__GHLShouldChangeAdIdFieldNamerelayprovider":false,"__relay_internal__pv__IsWorkUserrelayprovider":false,"__relay_internal__pv__CometUFIReactionsEnableShortNamerelayprovider":false,"__relay_internal__pv__CometFeedStoryDynamicResolutionPhotoAttachmentRenderer_experimentWidthrelayprovider":500,"__relay_internal__pv__CometImmersivePhotoCanUserDisable3DMotionrelayprovider":false,"__relay_internal__pv__IsMergQAPollsrelayprovider":false,"__relay_internal__pv__FBReelsMediaFooter_comet_enable_reels_ads_gkrelayprovider":false,"__relay_internal__pv__StoriesArmadilloReplyEnabledrelayprovider":true,"__relay_internal__pv__EventCometCardImage_prefetchEventImagerelayprovider":false,"__relay_internal__pv__GHLShouldChangeSponsoredAuctionDistanceFieldNamerelayprovider":false}`,
        'server_timestamps': 'true',
        'doc_id': '8997492047006365'
      }),
      {
        headers: {
          'cookie': cookie
        }
      }
    ).catch((error) => {
      if (error instanceof AxiosError) {
        return new UpdateFacebookStatusWithVideoErrResponseDto(error.response.status, true, error.response.data);
      }
    });

    if (step_three instanceof UpdateFacebookStatusWithVideoErrResponseDto) {
      return step_three.data;
    }

    await writeFile(`facebook-update-status-with-vids-${formatFilenameWithTimestamp('json')}`, JSON.stringify(step_three.data));
    return "Success uploading video";
  }
}
