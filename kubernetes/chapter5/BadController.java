@RestController
class BadController {
  // 컨트롤러의 멤버 변수로 카운트를 위한 `AtomicLong` 오브젝트를 생성한다.
  AtomicLong counter = new AtomicLong();

  @GetMapping("/count")
  public Long addCount() {
    // `/count` 요청이 올 때마다 멤버 변수를 하나 더한 뒤 반환한다.
    ValueOperations<String, Long> counter = redisTemplate.opsForValue();
    Long count = counter.increment("Counter");
    return count;
  }
}