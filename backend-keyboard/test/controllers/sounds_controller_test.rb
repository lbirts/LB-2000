require 'test_helper'

class SoundsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @sound = sounds(:one)
  end

  test "should get index" do
    get sounds_url, as: :json
    assert_response :success
  end

  test "should create sound" do
    assert_difference('Sound.count') do
      post sounds_url, params: { sound: { category_id: @sound.category_id, sound: @sound.sound, sound_name: @sound.sound_name } }, as: :json
    end

    assert_response 201
  end

  test "should show sound" do
    get sound_url(@sound), as: :json
    assert_response :success
  end

  test "should update sound" do
    patch sound_url(@sound), params: { sound: { category_id: @sound.category_id, sound: @sound.sound, sound_name: @sound.sound_name } }, as: :json
    assert_response 200
  end

  test "should destroy sound" do
    assert_difference('Sound.count', -1) do
      delete sound_url(@sound), as: :json
    end

    assert_response 204
  end
end
