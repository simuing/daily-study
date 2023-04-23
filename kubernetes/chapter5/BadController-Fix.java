@RestController
class BadController {

  RedisTemplate<String, Long> redisTemplate;

  public BadController(RedisTemplate<String, Long> redisTemplate) {
    // 프로젝트에 연결된 레디스에 접근하기 위하여 `RedisTemplate` 오브젝트 주입
    this.redisTemplate = redisTemplate;
  }

  @GetMapping("/count")
  public Long addCount() {
    ValueOperations<String, Long> counter = redisTemplate.opsForValue();
    // `/count`요청이 들어오면 레디스에서 카운트를 하난 증가시킨 뒤 그 값을 반환
    Long count = counter.increment("Counter");
    return count;
  }
}